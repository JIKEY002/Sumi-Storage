public class EncryptPasswordKeyFetch
  {
      static string public_key;
      static byte key_id;
      public static void GetPwdKeyFetch()
      {
          Leaf.xNet.HttpRequest request = new Leaf.xNet.HttpRequest();
          Leaf.xNet.RequestParams requestParams = new Leaf.xNet.RequestParams();
          requestParams["version"] = "2";
          requestParams["flow"] = "CONTROLLER_INITIALIZATION";
          requestParams["locale"] = "en_US";
          requestParams["client_country_code"] = "US";
          requestParams["method"] = "GET";
          requestParams["fb_api_req_friendly_name"] = "pwdKeyFetch";
          requestParams["fb_api_caller_class"] = "Fb4aAuthHandler";
          requestParams["access_token"] = "350685531728|62f8ce9f74b12f84c123cc23437a4a32";
          string text = request.Post("https://b-graph.facebook.com//pwd_key_fetch", requestParams).ToString();
          dynamic jsonSSL = JsonConvert.DeserializeObject<dynamic>(text);
          public_key = (string)jsonSSL["public_key"];
          key_id = Convert.ToByte(jsonSSL["key_id"]);
          Console.WriteLine($"public_key: {public_key}");
          Console.WriteLine($"key_id: {jsonSSL["key_id"]}");
      }

      public static string Encrypt(string password)
      {
          byte[] encryptionKey = GenerateSaltNewInstance(32);
          byte[] encryptionIV = GenerateSaltNewInstance(12);
          string current_time = DateTimeHelper.ToUnixTime().ToString();
          byte[] current_time_byte = Encoding.UTF8.GetBytes(current_time);
          RSACryptoServiceProvider rsa = ImportPublicKeyRSA(public_key);
          byte[] encrypted_rand_key = rsa.Encrypt(encryptionKey, RSAEncryptionPadding.Pkcs1);
          //=================================================================================
          int tagLenth = 16;
          var plaintextBytes = Encoding.UTF8.GetBytes(password);
          var bcCiphertext = new byte[plaintextBytes.Length + tagLenth];
          var cipher = new GcmBlockCipher(new AesEngine());
          var parameters = new AeadParameters(new KeyParameter(encryptionKey), tagLenth * 8, encryptionIV);
          cipher.Init(true, parameters);
          cipher.ProcessAadBytes(current_time_byte, 0, current_time_byte.Length);
          var offset = cipher.ProcessBytes(plaintextBytes, 0, plaintextBytes.Length, bcCiphertext, 0);
          cipher.DoFinal(bcCiphertext, offset);

          // Bouncy Castle includes the authentication tag in the ciphertext
          var ciphertext = new byte[plaintextBytes.Length];
          var auth_tag = new byte[tagLenth];
          Buffer.BlockCopy(bcCiphertext, 0, ciphertext, 0, plaintextBytes.Length);
          Buffer.BlockCopy(bcCiphertext, plaintextBytes.Length, auth_tag, 0, tagLenth);
          //=================================================================================
          var combinedStream = new MemoryStream();
          using (var binaryWriter = new BinaryWriter(combinedStream))
          {
              binaryWriter.Write(new byte[] { 1, key_id });
              binaryWriter.Write(encryptionIV);
              binaryWriter.Write(new Packer().Pack("<h", 0, encrypted_rand_key.Length));
              binaryWriter.Write(encrypted_rand_key);
              binaryWriter.Write(auth_tag);
              binaryWriter.Write(ciphertext);
          }
          string encode = Convert.ToBase64String(combinedStream.ToArray());
          //return $"#PWD_MSGR:1:{current_time}:{encode}";
          return $"#PWD_FB4A:2:{current_time}:{encode}";            
      }


      private static void WriteListByte(byte[] input)
      {
          string str = "";
          for (int i = 0; i < input.Length; i++)
          {
              str += input[i] + ",";
          }
          Console.WriteLine(str.Substring(0, str.Length - 1));
      }


      public static byte[] StringToByteArray(string hex)
      {
          return Enumerable.Range(0, hex.Length)
                           .Where(x => x % 2 == 0)
                           .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                           .ToArray();
      }

      private static byte[] GenerateSaltNewInstance(int size)
      {
          using (var generator = RandomNumberGenerator.Create())
          {
              var salt = new byte[size];
              generator.GetBytes(salt);
              return salt;
          }
      }

      private static RSACryptoServiceProvider ImportPublicKeyRSA(string public_key)
      {
          return DecodeX509PublicKey(Convert.FromBase64String(public_key.Replace("-----BEGIN PUBLIC KEY-----", "").Replace("-----END PUBLIC KEY-----", "")));
      }

      private static bool CompareBytearrays(byte[] a, byte[] b)
      {
          if (a.Length != b.Length)
              return false;
          int i = 0;
          foreach (byte c in a)
          {
              if (c != b[i])
                  return false;
              i++;
          }
          return true;
      }

      private static RSACryptoServiceProvider DecodeX509PublicKey(byte[] x509key)
      {
          // encoded OID sequence for  PKCS #1 rsaEncryption szOID_RSA_RSA = "1.2.840.113549.1.1.1"
          byte[] SeqOID = { 0x30, 0x0D, 0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x01, 0x05, 0x00 };
          byte[] seq = new byte[15];
          // ---------  Set up stream to read the asn.1 encoded SubjectPublicKeyInfo blob  ------
          MemoryStream mem = new MemoryStream(x509key);
          BinaryReader binr = new BinaryReader(mem);    //wrap Memory Stream with BinaryReader for easy reading
          byte bt = 0;
          ushort twobytes = 0;

          try
          {

              twobytes = binr.ReadUInt16();
              if (twobytes == 0x8130) //data read as little endian order (actual data order for Sequence is 30 81)
                  binr.ReadByte();    //advance 1 byte
              else if (twobytes == 0x8230)
                  binr.ReadInt16();   //advance 2 bytes
              else
                  return null;

              seq = binr.ReadBytes(15);       //read the Sequence OID
              if (!CompareBytearrays(seq, SeqOID))    //make sure Sequence for OID is correct
                  return null;

              twobytes = binr.ReadUInt16();
              if (twobytes == 0x8103) //data read as little endian order (actual data order for Bit String is 03 81)
                  binr.ReadByte();    //advance 1 byte
              else if (twobytes == 0x8203)
                  binr.ReadInt16();   //advance 2 bytes
              else
                  return null;

              bt = binr.ReadByte();
              if (bt != 0x00)     //expect null byte next
                  return null;

              twobytes = binr.ReadUInt16();
              if (twobytes == 0x8130) //data read as little endian order (actual data order for Sequence is 30 81)
                  binr.ReadByte();    //advance 1 byte
              else if (twobytes == 0x8230)
                  binr.ReadInt16();   //advance 2 bytes
              else
                  return null;

              twobytes = binr.ReadUInt16();
              byte lowbyte = 0x00;
              byte highbyte = 0x00;

              if (twobytes == 0x8102) //data read as little endian order (actual data order for Integer is 02 81)
                  lowbyte = binr.ReadByte();  // read next bytes which is bytes in modulus
              else if (twobytes == 0x8202)
              {
                  highbyte = binr.ReadByte(); //advance 2 bytes
                  lowbyte = binr.ReadByte();
              }
              else
                  return null;
              byte[] modint = { lowbyte, highbyte, 0x00, 0x00 };   //reverse byte order since asn.1 key uses big endian order
              int modsize = BitConverter.ToInt32(modint, 0);

              byte firstbyte = binr.ReadByte();
              binr.BaseStream.Seek(-1, SeekOrigin.Current);

              if (firstbyte == 0x00)
              {   //if first byte (highest order) of modulus is zero, don't include it
                  binr.ReadByte();    //skip this null byte
                  modsize -= 1;   //reduce modulus buffer size by 1
              }

              byte[] modulus = binr.ReadBytes(modsize);   //read the modulus bytes

              if (binr.ReadByte() != 0x02)            //expect an Integer for the exponent data
                  return null;
              int expbytes = (int)binr.ReadByte();        // should only need one byte for actual exponent data (for all useful values)
              byte[] exponent = binr.ReadBytes(expbytes);

              // ------- create RSACryptoServiceProvider instance and initialize with public key -----
              RSACryptoServiceProvider RSA = new RSACryptoServiceProvider();
              RSAParameters RSAKeyInfo = new RSAParameters();
              RSAKeyInfo.Modulus = modulus;
              RSAKeyInfo.Exponent = exponent;
              RSA.ImportParameters(RSAKeyInfo);
              return RSA;
          }
          catch (Exception)
          {
              return null;
          }

          finally { binr.Close(); }

      }
  }
