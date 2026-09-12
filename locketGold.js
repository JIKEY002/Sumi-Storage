var request = $request;

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        Authorization: request.headers["authorization"],
        "X-Platform": "iOS",
        "User-Agent": request.headers["user-agent"]
    }
};

$httpClient.get(options, function (error, newResponse, data) {
    const ent = JSON.parse(data);

    let jsonToUpdate = {
        request_date_ms: 1704070861000,
        request_date: "2006-04-03T01:01:01Z",
        subscriber: {
            non_subscriptions: {},
            first_seen: "2006-04-03T01:01:01Z",
            original_application_version: "2",
            other_purchases: {},
            management_url: "https://apps.apple.com/account/subscriptions",
            subscriptions: {},
            entitlements: {},
            original_purchase_date: "2006-04-03T01:01:01Z",
            original_app_user_id: "dK1MnzTyRZXeIPqjX4thAbFkfZE3",
            last_seen: "2006-04-03T01:01:01Z"
        }
    };

    const productEntitlementMapping = ent.product_entitlement_mapping;

    for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
        const productIdentifier = productInfo.product_identifier;
        const entitlements = productInfo.entitlements;

        for (const entitlement of entitlements) {
            console.log(`Entitlement: ${entitlement}`);
            jsonToUpdate.subscriber.entitlements[entitlement] = {
                grace_period_expires_date: null,
                purchase_date: "2006-04-03T01:01:01Z",
                product_identifier: productIdentifier,
                expires_date: "9692-01-01T01:01:01Z"
            };

            // Add product identifier to subscriptions
            jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
                auto_resume_date: null,
                expires_date: "9692-01-01T01:01:01Z",
                is_sandbox: false,
                original_purchase_date: "2006-04-03T01:01:01Z",
                refunded_at: null,
                store_transaction_id: "580002295410467",
                unsubscribe_detected_at: null,
                grace_period_expires_date: null,
                period_type: "normal",
                purchase_date: "2006-04-03T01:01:01Z",
                display_name: productIdentifier,
                billing_issues_detected_at: null,
                ownership_type: "PURCHASED",
                store: "app_store",
                management_url: "https://apps.apple.com/account/subscriptions"
            };
        }
    }

    body = JSON.stringify(jsonToUpdate);
    $done({ body });
});
