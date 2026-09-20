import { newConversation } from '../src/chat/session';

test('creates a new conversation with correct defaults', () => {
  const conversation = newConversation('claude', 'claude-3');
  
  expect(conversation.id).toMatch(/^c_[a-z0-9]+_[a-z0-9]{6}$/);
  expect(conversation.title).toBe('Untitled');
  expect(conversation.providerId).toBe('claude');
  expect(conversation.model).toBe('claude-3');
  expect(conversation.messages).toEqual([]);
  expect(conversation.providerSessions).toEqual({});
  expect(conversation.effort).toBe('medium');
  expect(conversation.thinking).toBe(true);
  expect(conversation.showTools).toBe(true);
  expect(conversation.createdAt).toBe(conversation.updatedAt);
  expect(conversation.createdAt).toBeGreaterThan(0);
});

test('creates conversation without model', () => {
  const conversation = newConversation('codex');
  
  expect(conversation.providerId).toBe('codex');
  expect(conversation.model).toBeUndefined();
});

test('creates conversation with custom effort level', () => {
  const conversation = newConversation('claude', 'claude-3', 'high');
  
  expect(conversation.effort).toBe('high');
});

test('creates conversation with default effort level', () => {
  const conversation = newConversation('claude', 'claude-3');
  
  expect(conversation.effort).toBe('medium');
});

test('creates conversation with empty providerSessions', () => {
  const conversation = newConversation('claude', 'claude-3');
  
  expect(conversation.providerSessions).toEqual({});
  expect(typeof conversation.providerSessions).toBe('object');
});

test('creates unique conversation IDs', () => {
  const conversation1 = newConversation('claude', 'claude-3');
  const conversation2 = newConversation('codex', 'gpt-4');
  
  expect(conversation1.id).not.toBe(conversation2.id);
});
