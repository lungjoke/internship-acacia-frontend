import { io } from 'socket.io-client';
import { onBeforeUnmount, onMounted, ref } from 'vue';
export function useSocket(socketUrl = 'http://localhost:3000') {
  const socket = ref<any>(null);
  const ClientData = ref<any[]>([]);

  onMounted(() => {
    socket.value = io(socketUrl, {
      transports: ['websocket'],
    });
    socket.value.on('connect', () => {
      console.log('socket connected', socket.value.connect);
    });
    socket.value.on('disconnect', (reason: any) => {
      console.log('socket disconnected', reason);
    });
    socket.value.on('connect_error', (error: any) => {
      console.log('socket error', error);
    });
    //
    //รับข้อมูลจากserver
    socket.value.on('broadcastEvent', (data: any) => {
      ClientData.value.push(data);
      console.log('socket data', data);
    });
  });

  onBeforeUnmount(() => {
    socket.value.removeAllListeners();
    socket.value.disconnect();
  });
  return { ClientData };
}
