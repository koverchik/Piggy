import * as React from 'react';

export interface ButtonAddType extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  srcImage?: string;
  callbackClick: React.Dispatch<React.SetStateAction<boolean>>;
}
