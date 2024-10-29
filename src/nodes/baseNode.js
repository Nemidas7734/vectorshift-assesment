// BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BaseNode = ({
  id,
  title,
  width = 200,
  height = 'auto',
  inputs = [],
  outputs = [],
  children,
  className = '',
}) => {
  return (
    <Card 
      className={`min-w-[200px] ${className}`}
      style={{ width, height }}
    >
      <CardHeader className="p-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {/* Input Handles */}
        {inputs.map((input, index) => (
          <Handle
            key={`${id}-${input.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{
              top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
              ...input.style
            }}
          />
        ))}

        {/* Node Content */}
        {children}

        {/* Output Handles */}
        {outputs.map((output, index) => (
          <Handle
            key={`${id}-${output.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{
              top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
              ...output.style
            }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default BaseNode;