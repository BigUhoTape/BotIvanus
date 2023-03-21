import { Interaction, Message } from 'discord.js';
import { EventArgType } from '../interfaces/IEvent.js';

export const checkIsInteraction = (instance: EventArgType): instance is Interaction => {
  return !!(instance as Interaction);
};

export const checkIsMessage = (instance: EventArgType): instance is Message => {
  return !!(instance as Message);
};
