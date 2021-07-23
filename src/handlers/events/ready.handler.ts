import Log from '../../utils/log';
import Event from './event-handler';
import Deps from '../../utils/deps';
import CommandService from '../commands/command.service';

import AutoMod from '../../modules/auto-mod/auto-mod';
import ReactionRoles from '../../modules/general/reaction-roles';
import { Client } from 'discord.js';

export default class ReadyHandler implements Event {
  started = false;
  on = 'ready';
  
  constructor(
    private autoMod = Deps.get<AutoMod>(AutoMod),
    private bot = Deps.get<Client>(Client),
    private commandService = Deps.get<CommandService>(CommandService),
    private reactionRoles = Deps.get<ReactionRoles>(ReactionRoles)
  ) {}

  async invoke() {
    Log.info(`Bot is live!`, `events`);

    if (this.started) return;
    this.started = true;
    
    await this.autoMod.init();
    await this.commandService.init();
    await this.reactionRoles.init();

    await this.bot.user?.setActivity('Kop Ultra v2  Made by Pixey#2021');
  }
}
