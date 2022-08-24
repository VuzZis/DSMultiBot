const fs = require('fs');

const { Event } = require('../classes');

module.exports = (client,database) => {
    const load_dir = () => {
        const event_files = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js'));

        for(const file of event_files) {
            const event = require(`../events/${file}`);
            const event_name = file.split(".")[0];
            client.addEvent(new Event(event_name,event.bind(null,client,database)));
        }
    }   
    load_dir();
}