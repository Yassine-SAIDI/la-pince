// Mock pour @clerk/nextjs
module.exports = {
  currentUser: jest.fn(() =>
    Promise.resolve({
      id: "user_test",
      firstName: "Test",
      lastName: "User",
    })
  ),
  auth: jest.fn(() => ({
    userId: "user_test",
  })),
  clerkClient: {
    users: {
      getUser: jest.fn(() => Promise.resolve({})),
    },
  },
};
