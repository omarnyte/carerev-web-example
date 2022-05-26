import React from 'react';
import styled from 'styled-components/macro';

interface ErrorViewProps {
  error: string;
  onRetry: () => void;
}

export function ErrorView({ error, onRetry }: ErrorViewProps) {
  return (
    <div>
      <h1>{error}</h1>
      <p>
        There was an error retrieving country information. Click the button
        below to try again.
      </p>
      <RetryButton onClick={onRetry}>Try again</RetryButton>
    </div>
  );
}

const RetryButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 1rem 1.5rem;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.25rem;
`;
