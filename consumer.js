const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"]
})
const run = async () => {
 const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'Kafka', fromBeginning: true })
 
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      let current_offset=parseInt(message.offset)+1;
      console.log({
          partition,
          offset: current_offset.toString(),
          value: message.value.toString(),
        })
      consumer.commitOffsets([{topic:topic,partition:partition,offset:current_offset.toString()}])
    },
  })
}

 
run().catch(console.error)