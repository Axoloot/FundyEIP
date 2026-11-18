import axios from 'axios';

import database from '../../database';

export async function sendPushNotification(token: string, message: string) {
  await axios.post('https://exp.host/--/api/v2/push/send', {
    to: token,
    sound: 'default',
    title: 'We just rounded one of your payment !',
    body: message,
    icon: 'https://pics.me.me/thumb_thanks-i-hate-clipping-my-teeth-before-i-eat-ice-61526697.png'
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function registerToken(id: string, token: string) {
  await database.user.update({
    data: {
      deviceNotificationToken: token,
    },
    where: { id },
  })
}
