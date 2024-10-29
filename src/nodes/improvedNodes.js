// Input Node
import React, { useState } from 'react';
import BaseNode from './baseNode';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: 'value' }]}
    >
      <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-xs">Name:</label>
          <Input
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs">Type:</label>
          <Select value={inputType} onValueChange={setInputType}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  );
};

// TextNode with dynamic sizing and variable detection
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    // Extract variables from text
    const matches = newText.match(/{{(.*?)}}/g) || [];
    const newVars = matches
      .map(match => match.slice(2, -2).trim())
      .filter(v => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v));
    
    setVariables([...new Set(newVars)]);
  };

  // Calculate height based on content
  const calculateHeight = () => {
    const baseHeight = 80;
    const textLength = currText.length;
    const lineBreaks = (currText.match(/\n/g) || []).length;
    return Math.max(baseHeight, 40 + (lineBreaks * 20) + (Math.floor(textLength / 30) * 20));
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      height={calculateHeight()}
      inputs={variables.map(v => ({ id: v }))}
      outputs={[{ id: 'output' }]}
    >
      <div className="space-y-2">
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="w-full min-h-[60px] p-2 border rounded resize-none"
          style={{ height: `${calculateHeight() - 20}px` }}
        />
      </div>
    </BaseNode>
  );
};

// LLM Node
export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Language Model"
      inputs={[
        { id: 'system' },
        { id: 'prompt' }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="text-sm text-gray-600">
        Process text using language model
      </div>
    </BaseNode>
  );
};

// Output Node
export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: 'value' }]}
    >
      <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-xs">Name:</label>
          <Input
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs">Type:</label>
          <Select value={outputType} onValueChange={setOutputType}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  );
};

// Example of 5 new nodes using the abstraction
export const ImageProcessingNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Image Processing"
    inputs={[{ id: 'image' }]}
    outputs={[{ id: 'processed' }]}
  >
    <div className="space-y-2">
      <Select defaultValue="resize">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="resize">Resize</SelectItem>
          <SelectItem value="blur">Blur</SelectItem>
          <SelectItem value="sharpen">Sharpen</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </BaseNode>
);

export const DataTransformNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Data Transform"
    inputs={[{ id: 'input' }]}
    outputs={[{ id: 'output' }]}
  >
    <div className="space-y-2">
      <Select defaultValue="json">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="json">To JSON</SelectItem>
          <SelectItem value="xml">To XML</SelectItem>
          <SelectItem value="csv">To CSV</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </BaseNode>
);

export const FilterNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Filter"
    inputs={[{ id: 'input' }]}
    outputs={[{ id: 'filtered' }, { id: 'rejected' }]}
  >
    <Input
      placeholder="Enter filter condition..."
      className="h-8"
    />
  </BaseNode>
);

export const MergeNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Merge"
    inputs={[{ id: 'a' }, { id: 'b' }]}
    outputs={[{ id: 'merged' }]}
  >
    <Select defaultValue="concat">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="concat">Concatenate</SelectItem>
        <SelectItem value="zip">Zip</SelectItem>
        <SelectItem value="interleave">Interleave</SelectItem>
      </SelectContent>
    </Select>
  </BaseNode>
);

export const TimerNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Timer"
    outputs={[{ id: 'trigger' }]}
  >
    <div className="space-y-2">
      <Input
        type="number"
        placeholder="Interval (ms)"
        className="h-8"
      />
      <Select defaultValue="interval">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="interval">Interval</SelectItem>
          <SelectItem value="timeout">Timeout</SelectItem>
          <SelectItem value="cron">Cron</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </BaseNode>
);