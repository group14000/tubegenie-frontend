'use client';

import { useState } from 'react';
import { useGenerateContent } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function GenerateContentExample() {
  const [topic, setTopic] = useState('');
  const [model, setModel] = useState('tngtech/deepseek-r1t2-chimera:free');

  const { mutate, isPending, data, error } = useGenerateContent({
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Content generated successfully!');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to generate content');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ topic, model });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Content Generator</CardTitle>
          <CardDescription>
            Generate YouTube content ideas using AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., AI in Healthcare 2025"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">AI Model</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Generating...' : 'Generate Content'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
              <p className="font-semibold">Error:</p>
              <p>{error.message}</p>
            </div>
          )}

          {data && data.success && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Generated Titles:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.data.titles.map((title, idx) => (
                    <li key={idx} className="text-sm">{title}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description:</h3>
                <p className="text-sm">{data.data.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {data.data.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-primary/10 rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Thumbnail Ideas:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.data.thumbnailIdeas.map((idea, idx) => (
                    <li key={idx} className="text-sm">{idea}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Script Outline:</h3>
                <ol className="list-decimal list-inside space-y-1">
                  {data.data.scriptOutline.map((item, idx) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))}
                </ol>
              </div>

              <div className="text-xs text-muted-foreground">
                Model used: {data.data.aiModel}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
