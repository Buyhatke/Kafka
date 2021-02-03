const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["b-3.demo-cluster-1.buxdcn.c2.kafka.ap-southeast-1.amazonaws.com:9092","b-4.demo-cluster-1.buxdcn.c2.kafka.ap-southeast-1.amazonaws.com:9092","b-1.demo-cluster-1.buxdcn.c2.kafka.ap-southeast-1.amazonaws.com:9092"]
})
 
const producer = kafka.producer()
 
const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'AWSKafka',
    messages: [
      { value: 'Sending message!' },
    ],
  })


// Consuming
// const consumer = kafka.consumer({ groupId: 'test-group' })

  // await consumer.connect()
  // await consumer.subscribe({ topic: 'AWSKafka', fromBeginning: true })
 
  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       partition,
  //       offset: message.offset,
  //       value: message.value.toString(),
  //     })
  //   },
  // })
}
 
run().catch(console.error)