import {AudioFilters, Player} from 'discord-player'
import {
  CommandInteraction,
  GuildMember,
  Interaction,
  MessageEmbed,
} from 'discord.js'

import {EmbedMessage} from '../helpers/embedMessage'
import {SlashCommandBuilder} from '@discordjs/builders'

const filters = {
  bassboost: 'string',
  bassboost_high: 'string',
  '8D': 'string',
  vaporwave: 'string',
  nightcore: 'string',
  phaser: 'string',
  tremolo: 'string',
  vibrato: 'string',
  reverse: 'string',
  treble: 'string',
  normalizer2: 'string',
  surrounding: 'string',
  pulsator: 'string',
  subboost: 'string',
  flanger: 'string',
  gate: 'string',
  mono: 'string',
  compressor: 'string',
  expander: 'string',
  softlimiter: 'string',
  chorus: 'string',
  chorus2d: 'string',
  chorus3d: 'string',
  fadein: 'string',
  earrape: 'string',
}

const filtersArr: [name: string, value: string][] = []
Object.keys({...filters}).map((v) => filtersArr.push([v, v]))

module.exports = {
  data: new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Coloca Filtros na música ex: bassboost')
    .addStringOption((option) =>
      option
        .setName('filter')
        .setDescription('Filtro a colocar')
        .setRequired(true)
        .addChoices(filtersArr)
    ),
  execute: async (interaction: CommandInteraction, player: Player) => {
    if (!interaction.guildId) return
    if (
      interaction.member instanceof GuildMember &&
      interaction.member.voice.channelId ==
        interaction.guild?.me?.voice.channelId
    ) {
      const queue = player.getQueue(interaction.guildId)
      if (!queue) {
        EmbedMessage('Nenhuma musica está tocando')
      }
      const filterApply = interaction.options.getString('filter', true)

      queue.setFilters({[filterApply]: true})

      await EmbedMessage({
        message: `${
          filterApply[0].toUpperCase() + filterApply.substr(1)
        } aplicado no bot com sucesso!`,
        interaction,
        color: 'GREEN',
      })
    }
  },
}
