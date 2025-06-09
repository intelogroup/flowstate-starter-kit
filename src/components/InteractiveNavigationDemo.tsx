
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import InteractiveFormField from './InteractiveFormField';
import InteractiveDataTable from './InteractiveDataTable';
import InteractiveStatusCard from './InteractiveStatusCard';

const InteractiveNavigationDemo = () => {
  const [activeTab, setActiveTab] = useState("forms");

  // Sample data for the table
  const sampleData = [
    { id: 1, name: "Email to Slack", status: "Active", lastRun: "2 min ago", runs: 47 },
    { id: 2, name: "Form to Sheets", status: "Paused", lastRun: "1 hour ago", runs: 23 },
    { id: 3, name: "Calendar Sync", status: "Error", lastRun: "Failed", runs: 15 },
  ];

  const tableColumns = [
    { key: 'name', label: 'Flow Name', sortable: true, filterable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : value === 'Error' ? 'destructive' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'lastRun', label: 'Last Run', sortable: true },
    { key: 'runs', label: 'Total Runs', sortable: true },
  ];

  const formOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interactive Components Demo</h2>
        <p className="text-muted-foreground">
          Fully functional interactive components replacing static placeholders
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="tables">Data Tables</TabsTrigger>
          <TabsTrigger value="status">Status Cards</TabsTrigger>
          <TabsTrigger value="mixed">Mixed Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Form Fields</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InteractiveFormField
                type="text"
                label="Flow Name"
                placeholder="Enter flow name..."
                required
              />
              
              <InteractiveFormField
                type="email"
                label="Notification Email"
                placeholder="user@example.com"
              />
              
              <InteractiveFormField
                type="password"
                label="API Key"
                placeholder="Enter API key..."
                required
              />
              
              <InteractiveFormField
                type="select"
                label="Trigger Type"
                placeholder="Select trigger..."
                options={formOptions}
              />
              
              <InteractiveFormField
                type="multiselect"
                label="Categories"
                options={formOptions}
              />
              
              <InteractiveFormField
                type="switch"
                label="Enable Notifications"
              />
              
              <div className="md:col-span-2">
                <InteractiveFormField
                  type="tags"
                  label="Tags"
                  placeholder="Add tags..."
                />
              </div>
              
              <div className="md:col-span-2">
                <InteractiveFormField
                  type="textarea"
                  label="Description"
                  placeholder="Describe your automation..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Data Table</CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveDataTable
                columns={tableColumns}
                data={sampleData}
                searchable
                selectable
                pagination
                onRowClick={(row) => console.log('Row clicked:', row)}
                onSelectionChange={(rows) => console.log('Selection changed:', rows)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InteractiveStatusCard
              title="Active Flows"
              value={12}
              description="Currently running automations"
              status="active"
              trend="up"
              trendValue="+2 this week"
              toggleable
              actionable
              refreshable
              onToggle={(enabled) => console.log('Toggled:', enabled)}
              onAction={() => console.log('Action clicked')}
              onRefresh={() => console.log('Refresh clicked')}
            />
            
            <InteractiveStatusCard
              title="Success Rate"
              value="94.2%"
              description="Successful executions"
              status="success"
              trend="up"
              trendValue="+1.2%"
              progress={94}
              refreshable
              onRefresh={() => console.log('Refresh clicked')}
            />
            
            <InteractiveStatusCard
              title="Error Rate"
              value="5.8%"
              description="Failed executions"
              status="warning"
              trend="down"
              trendValue="-0.3%"
              actionable
              onAction={() => console.log('Fix errors')}
            />
          </div>
        </TabsContent>

        <TabsContent value="mixed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InteractiveFormField
                      type="select"
                      label="Template"
                      options={[
                        { value: 'email-slack', label: 'Email to Slack' },
                        { value: 'form-sheets', label: 'Form to Sheets' },
                        { value: 'calendar-sync', label: 'Calendar Sync' }
                      ]}
                    />
                    <InteractiveFormField
                      type="switch"
                      label="Auto-activate"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button>Create Flow</Button>
                    <Button variant="outline">Save Draft</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <InteractiveStatusCard
                title="System Status"
                value="Healthy"
                status="success"
                actionable
                refreshable
              />
              
              <InteractiveStatusCard
                title="API Calls"
                value="1,247"
                description="This month"
                trend="up"
                trendValue="+12%"
                progress={67}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveNavigationDemo;
