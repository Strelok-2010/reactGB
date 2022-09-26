import React from 'react';

interface WithClassesProps {
  title: string;
}

export function WithClasses<T>(
  Component: React.ComponentType<T & WithClassesProps>
) {
  return function Wrapper(props: T & WithClassesProps) {
    return <Component {...props} title={props.title} />;
  };
}
