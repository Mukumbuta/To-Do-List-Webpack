class MockStorage {
    static data = [];

    static add(obj) {
      MockStorage.data.push(obj);
    }
}

export default MockStorage;