import {logger} from "../logger.js";
import {MongoUtil} from "../util/mongoUtil.js";
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {TimeUtil} from "../util/timeUtil.js";

function formatDailyTime(dailyTime: string) {
    if (dailyTime) {
        return TimeUtil.formatDailyTime(dailyTime)
    }
    return "미등록"
}

export default {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('등록된 모든 백준 아이디 목록을 보여드립니다.'),
    async execute(interaction: ChatInputCommandInteraction) {
        try {
            const guildId = interaction.guildId
            if (!guildId) {
                await interaction.reply("서버 정보를 가져올 수 없습니다. 명령을 취소합니다.")
                return;
            }

            const users = await MongoUtil.findAllUserInGuild(guildId);
            if (!users || users.length === 0) {
                await interaction.reply(`등록된 유저가 없습니다. \n/quit을 통해 아이디를 등록해주세요.`)
                return;
            }

            const userInfo = users.map(user => {
                return `백준 아이디: ${user.boj_id} | 매일 알림 시간: ${formatDailyTime(user.daily_time)}`;
            }).join('\n')

            await interaction.reply(userInfo)
            return;
        } catch (error: any) {
            await interaction.reply("알 수 없는 오류가 발생했습니다.")
            logger.error(error.message)
        }
    }
}
