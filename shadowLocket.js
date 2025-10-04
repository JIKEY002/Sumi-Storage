const data = JSON.parse($response.body);

$done({
    body: JSON.stringify({
        request_date_ms: data.request_date_ms,
        request_date: data.request_date,
        subscriber: {
            entitlement: {},
            first_seen: "2024-08-04T04:43:14Z",
            original_application_version: data.subscriber.original_application_version,
            last_seen: "2025-10-04T14:42:09Z",
            other_purchases: {},
            management_url: null,
            subscriptions: {
                locket_099_1m: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_099_1m_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_1000_1y_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_1500_1y_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_1600_1y: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_199_1m: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_199_1m_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_2000_1y_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_2400_1y: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_299_1m: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_299_1m_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_3600_1y: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_3600_1y_yearly_trial: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_399_1m: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_399_1m_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_399_1m_yearly_trial: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_4800_1y: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_499_1m: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_499_1m_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_599_1m: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_599_1m_only: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_6000_1y: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                },
                locket_800_1y: {
                    expires_date: "9692-01-01T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    purchase_date: "2006-04-03T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store"
                }
            },
            entitlements: {
                Gold: {
                    purchase_date: "2006-04-03T01:01:01Z",
                    original_purchase_date: "2006-04-03T01:01:01Z",
                    expires_date: "9692-01-01T01:01:01Z",
                    is_sandbox: false,
                    ownership_type: "PURCHASED",
                    store: "app_store",
                    product_identifier: "locket_800_1y"
                }
            },
            original_purchase_date: "2006-04-03T01:01:01Z",
            original_app_user_id: data.subscriber.original_app_user_id,
            non_subscriptions: {}
        }
    })
});
