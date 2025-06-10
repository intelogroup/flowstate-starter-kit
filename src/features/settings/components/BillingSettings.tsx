
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSettings } from "../hooks/useSettings";

const BillingSettings = () => {
  const { settings } = useSettings();

  if (!settings) return null;

  const { billing } = settings;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold capitalize">{billing.plan} Plan</h3>
              <p className="text-sm text-muted-foreground">
                Billed {billing.billingCycle}
              </p>
            </div>
            <Badge variant={billing.plan === 'free' ? 'secondary' : 'default'}>
              {billing.plan.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm">
            Next billing date: {billing.nextBillingDate}
          </p>
          <p className="text-sm">
            Payment method: {billing.paymentMethod}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Flows</span>
              <span>{billing.usage.flowsUsed} / {billing.usage.flowsLimit}</span>
            </div>
            <Progress 
              value={(billing.usage.flowsUsed / billing.usage.flowsLimit) * 100} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Executions</span>
              <span>{billing.usage.executionsUsed.toLocaleString()} / {billing.usage.executionsLimit.toLocaleString()}</span>
            </div>
            <Progress 
              value={(billing.usage.executionsUsed / billing.usage.executionsLimit) * 100} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Storage (MB)</span>
              <span>{billing.usage.storageUsed} / {billing.usage.storageLimit}</span>
            </div>
            <Progress 
              value={(billing.usage.storageUsed / billing.usage.storageLimit) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
