import React, {useState} from "react";
import ReactDOM from "react-dom";

const AddEvent = ({loadEvents})=>{

    const [name, setName] = useState("");

    const valider = (e) => {
            e.preventDefault();

            // On crée notre event
            let event = {name:name};
            let body = JSON.stringify(event);

            fetch('api/events', {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
                .then((res) => res.json())
                .then((eventsReponse) => {
                    loadEvents()
                })

    }

    return (
        <form onSubmit={valider}>
            <input type={"text"} value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
            <button>Valider</button>
        </form>
    )
}

// export default AddEvent;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            name : ''
        }
        
    }

    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = () => {
        fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                this.setState({events: eventsReponse})
            })
    }

    render() {
        const {events, event} = this.state;
        return(
        <div>
                <h1>Liste des événements</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events && events.map(event => <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <AddEvent loadEvents={this.loadEvents} name={""}/>
            </div>
        
        
        )
    }

}

ReactDOM.render(<Application/>, document.getElementById("root"))