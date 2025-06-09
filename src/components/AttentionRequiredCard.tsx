
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AttentionRequiredCard = () => {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <CardTitle className="text-destructive">Attention Required</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">Gmail access expired for "Email to Drive - Invoices"</p>
          <p className="text-sm text-muted-foreground">This automation has been paused</p>
        </div>
        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
          Reconnect Gmail
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttentionRequiredCard;
