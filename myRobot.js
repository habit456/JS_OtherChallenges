const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
]

/*
  buildGraph builds an object that takes a place in the village and gives an array
  value which contains all of the places that you can go to in 1 unit like this:
  {
    "Alice's House": ["Bob's House", "Cabin", "Post Office"],
    "Bob's House": ["Alice's House", "Town Hall"],
    etc.
  }
*/
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

/*
  The VillageState represents the main variables of the village.
  1) place: where the robot is.
  2) parcels: where the mail is.
    a) the mail will either be at someone else's place or
    b) where the robot is

  The move method allows the robot to move to a destination:
*/

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    //if the current location can't reach the destination in one turn, invalid move.
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      /*
        Parcels are updated:
        1) parcels that aren't in the robot's location remain the same.
        2) parcels that are in the robot's location are updated to be in the
        same location as where the robot moves.
        3) The mail that is at its address destination is removed from the list
        of parcels.
      */
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);

      //new VillageState is created where the robot's position is where you wanted
      //it to move. The parcels are now the updated object.
      return new VillageState(destination, parcels);
    }
  }
}

/*
  random is a method in the VillageState class that creates a random village
  state with 5 random parcels to pick up and deliver to 5 random addresses.
  The robot's position is at the post office.
*/
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

/*
  runRobot takes the village state, the robot function, and memory.
  It loops until all parcels have been delivered. Each loop counts as a turn.
  Once parcels.length = 0, it is done and says how many turns it took. Each loop
  updates runRobot's parameter variables.
*/
function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }

    //action = {direction: , memory: }
    let action = robot(state, memory);

    //state parameter variable = new villagestate where the robot has moved
    state = state.move(action.direction);

    //memory parameter variable is updated by calling the robot function
    memory = action.memory;
    console.log(`Moved to $action.direction`);
  }
}

//picks random element in an array
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

//mailRoute is for the robot's memory
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];


/*
  findRoute creates a web of potential routes to go through. It basically
  follows these steps.
  1) From the current location, looks through all the routes.
    a) do any of the routes lead to the targetted destination? If so, return
    that route.
    b) if the potential road doesn't lead to the targetted destination, push
    it into the work list array of objects where the robot is at that route
    and the route includes the road that was taken to get there. It also checks
    if the robot is already at that current place in another route before concat-ing
    it.
  2) Now we have an array of routes where the robot has moved one step.
  3) repeat the process for each of those routes creates branching paths until one
  leads to the route.
  4) efficiency idea: find multiple routes and return the shortest one instead of
  just the first one that comes up?
*/

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

/*
  goalOrientedRobot
  1) If there isn't a specified route, creates a route to follow.
    a) if parcels[0] is not on the robot, the robot follows a route to it.
    b) if parcels[0] is on the robot, the robot follows a route to its address.
  2) Once the parcel is delivered, a new parcel list is updated w/ that parcel
  removed.
*/

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address)
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

/*
  the routeRobot just follows the mailRoute path twice; once to pick up mail,
  twice to deliver.
*/
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(), goalOrientedRobot, "");
