// This in-memory store is useful for classroom demos because it lets the
// backend run without MySQL. Data resets whenever the server restarts.
const memoryStore = {
  counters: {
    users: 1,
    patients: 1,
    doctors: 1,
    appointments: 1,
    bills: 1,
    payments: 1,
    medical_records: 1
  },
  users: [],
  patients: [],
  doctors: [],
  appointments: [],
  bills: [],
  payments: [],
  medical_records: []
};

export const nextId = (tableName) => {
  const id = memoryStore.counters[tableName];
  memoryStore.counters[tableName] += 1;
  return id;
};

export default memoryStore;
