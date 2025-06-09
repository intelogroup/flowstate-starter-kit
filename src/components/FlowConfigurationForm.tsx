import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Settings, Mail, Database, FileText, Globe, MessageSquare, Calendar } from "lucide-react";
import DynamicInput from './DynamicInput';

interface FlowStep {
  id: string;
  name: string;
  type: string;
}

interface Flow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
}

interface FlowConfigurationFormProps {
  flow: Flow;
  onSave: (flow: Flow, stepConfigurations: Record<string, any>) => void;
  onCancel: () => void;
}

const stepTypes = [
  { type: 'gmail', label: 'Gmail', icon: Mail },
  { type: 'google-drive', label: 'Google Drive', icon: Database },
  { type: 'webhook', label: 'Webhook', icon: Globe },
  { type: 'delay', label: 'Delay', icon: Calendar },
];

const getStepOutputFields = (stepType: string) => {
  switch (stepType) {
    case 'gmail':
      return [
        { key: 'subject', label: 'Subject', type: 'string', example: 'Invoice from Acme Corp' },
        { key: 'body', label: 'Body', type: 'string', example: 'Dear Customer...' },
        { key: 'sender', label: 'Sender', type: 'string', example: 'invoices@acme.com' },
        { key: 'date', label: 'Date', type: 'date', example: '2024-04-23' },
        { key: 'attachmentCount', label: 'Attachment Count', type: 'number', example: '2' },
      ];
    case 'google-drive':
      return [
        { key: 'fileId', label: 'File ID', type: 'string', example: '123abc456def' },
        { key: 'fileName', label: 'File Name', type: 'string', example: 'Invoice.pdf' },
        { key: 'fileSize', label: 'File Size', type: 'number', example: '2.5MB' },
        { key: 'createdAt', label: 'Created At', type: 'date', example: '2024-04-23' },
      ];
    case 'webhook':
      return [
        { key: 'responseCode', label: 'Response Code', type: 'number', example: '200' },
        { key: 'responseBody', label: 'Response Body', type: 'json', example: '{ "status": "success" }' },
        { key: 'responseTime', label: 'Response Time', type: 'number', example: '120ms' },
      ];
    case 'delay':
      return [
        { key: 'startTime', label: 'Start Time', type: 'date', example: '2024-04-23 10:00' },
        { key: 'endTime', label: 'End Time', type: 'date', example: '2024-04-23 10:05' },
      ];
    default:
      return [];
  }
};

const FlowConfigurationForm = ({ flow, onSave, onCancel }: FlowConfigurationFormProps) => {
  const [flowName, setFlowName] = useState(flow.name);
  const [flowDescription, setFlowDescription] = useState(flow.description);
  const [steps, setSteps] = useState(flow.steps);
  const [stepConfigurations, setStepConfigurations] = useState<Record<string, any>>({});
  const [advancedSettings, setAdvancedSettings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialConfig: Record<string, any> = {};
    flow.steps.forEach(step => {
      initialConfig[step.id] = {};
    });
    setStepConfigurations(initialConfig);
  }, [flow]);

  const addStep = (type: string) => {
    const newStep: FlowStep = {
      id: Math.random().toString(36).substring(7),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Step`,
      type: type,
    };

    setSteps([...steps, newStep]);
    setStepConfigurations(prev => ({
      ...prev,
      [newStep.id]: {}
    }));
    setAdvancedSettings(prev => ({
      ...prev,
      [newStep.id]: false
    }));
  };

  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);

    const newConfigs = { ...stepConfigurations };
    delete newConfigs[steps[index].id];
    setStepConfigurations(newConfigs);

    const newAdvancedSettings = { ...advancedSettings };
    delete newAdvancedSettings[steps[index].id];
    setAdvancedSettings(newAdvancedSettings);
  };

  const updateStepConfig = (stepId: string, key: string, value: any) => {
    setStepConfigurations(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [key]: value
      }
    }));
  };

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case 'gmail':
        return <Mail className="w-5 h-5" />;
      case 'google-drive':
        return <Database className="w-5 h-5" />;
      case 'webhook':
        return <Globe className="w-5 h-5" />;
      case 'delay':
        return <Calendar className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const renderStepConfiguration = (step: FlowStep, stepIndex: number) => {
    const stepConfig = stepConfigurations[step.id] || {};
    const previousSteps = flow.steps.slice(0, stepIndex);
    const availableData = previousSteps.map(prevStep => ({
      stepId: prevStep.id,
      stepName: prevStep.name,
      stepType: prevStep.type,
      fields: getStepOutputFields(prevStep.type)
    }));

    return (
      <Card key={step.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStepIcon(step.type)}
              <div>
                <CardTitle className="text-lg">{step.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {step.type}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeStep(stepIndex)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.type === 'gmail' && (
            <>
              <DynamicInput
                label="Search Query"
                value={stepConfig.query || ''}
                onChange={(value) => updateStepConfig(step.id, 'query', value)}
                placeholder="has:attachment from:invoices@company.com"
                availableData={availableData}
                className="w-full"
              />
              <DynamicInput
                label="Email Processing Instructions"
                value={stepConfig.instructions || ''}
                onChange={(value) => updateStepConfig(step.id, 'instructions', value)}
                placeholder="Extract invoice data and save attachments..."
                availableData={availableData}
              />
              <DynamicInput
                label="Folder/Label"
                value={stepConfig.folder || ''}
                onChange={(value) => updateStepConfig(step.id, 'folder', value)}
                placeholder="Processed Invoices"
                availableData={availableData}
              />
            </>
          )}

          {step.type === 'google-drive' && (
            <>
              <DynamicInput
                label="Folder Path"
                value={stepConfig.folderPath || ''}
                onChange={(value) => updateStepConfig(step.id, 'folderPath', value)}
                availableData={availableData}
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">File Naming</label>
                  <select
                    value={stepConfig.namingStrategy || 'original'}
                    onChange={(e) => updateStepConfig(step.id, 'namingStrategy', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="original">Keep Original Name</option>
                    <option value="timestamp">Add Timestamp</option>
                    <option value="custom">Custom Pattern</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">File Organization</label>
                  <select
                    value={stepConfig.organization || 'single'}
                    onChange={(e) => updateStepConfig(step.id, 'organization', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="single">Single Folder</option>
                    <option value="date">Organize by Date</option>
                    <option value="sender">Organize by Sender</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step.type === 'webhook' && (
            <>
              <DynamicInput
                label="Webhook URL"
                value={stepConfig.url || ''}
                onChange={(value) => updateStepConfig(step.id, 'url', value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                availableData={availableData}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">HTTP Method</label>
                  <select
                    value={stepConfig.method || 'POST'}
                    onChange={(e) => updateStepConfig(step.id, 'method', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <select
                    value={stepConfig.contentType || 'application/json'}
                    onChange={(e) => updateStepConfig(step.id, 'contentType', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="application/json">JSON</option>
                    <option value="application/x-www-form-urlencoded">Form Data</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step.type === 'delay' && (
            <div className="grid grid-cols-2 gap-4">
              <DynamicInput
                label="Duration"
                value={stepConfig.duration || ''}
                onChange={(value) => updateStepConfig(step.id, 'duration', value)}
                placeholder="5"
                availableData={availableData}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit</label>
                <select
                  value={stepConfig.unit || 'minutes'}
                  onChange={(e) => updateStepConfig(step.id, 'unit', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          )}

          <div className="pt-3 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAdvancedSettings(prev => ({
                ...prev,
                [step.id]: !prev[step.id]
              }))}
              className="mb-3"
            >
              <Settings className="w-4 h-4 mr-2" />
              {advancedSettings[step.id] ? 'Hide' : 'Show'} Advanced Settings
            </Button>

            {advancedSettings[step.id] && (
              <div className="space-y-3 p-3 bg-accent/50 rounded-lg">
                <DynamicInput
                  label="Error Handling"
                  value={stepConfig.errorHandling || ''}
                  onChange={(value) => updateStepConfig(step.id, 'errorHandling', value)}
                  placeholder="Continue on error, retry 3 times"
                  availableData={availableData}
                />
                <DynamicInput
                  label="Custom Headers (JSON)"
                  value={stepConfig.headers || ''}
                  onChange={(value) => updateStepConfig(step.id, 'headers', value)}
                  availableData={availableData}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Configure Flow</h2>
          <Badge variant="secondary">{steps.length} steps</Badge>
        </div>
        <p className="text-muted-foreground">
          Configure the details and steps for your automation flow.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Flow Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="flowName" className="text-sm font-medium">
                  Flow Name
                </label>
                <input
                  type="text"
                  id="flowName"
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                  placeholder="My Automation Flow"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="flowDescription" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="flowDescription"
                  value={flowDescription}
                  onChange={(e) => setFlowDescription(e.target.value)}
                  placeholder="A brief description of what this flow does."
                  className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Steps</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setAdvancedSettings({})} >
                <Settings className="w-4 h-4 mr-2" />
                Reset Step Settings
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  renderStepConfiguration(step, index)
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stepTypes.map((stepType) => (
                <Button
                  key={stepType.type}
                  variant="secondary"
                  onClick={() => addStep(stepType.type)}
                  className="gap-2"
                >
                  <stepType.icon className="w-4 h-4" />
                  Add {stepType.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave({
          id: flow.id,
          name: flowName,
          description: flowDescription,
          steps: steps,
        }, stepConfigurations)}>
          Save Flow
        </Button>
      </div>
    </div>
  );
};

export default FlowConfigurationForm;
