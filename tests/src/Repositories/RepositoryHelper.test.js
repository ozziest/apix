const RepositoryHelper = require(`${src}/Repositories/RepositoryHelper`)

test('RepositoryHelper should be able to get model path when I have an url for it.', () => {
  const routeHelper = {}
  routeHelper.get = jest.fn(() => {
    return {
      model: 'User'
    }
  })

  const helper = new RepositoryHelper(routeHelper)
  const path = helper.getModelPath('api/users')
  
  expect(path).toBe('App/Models/User')
  expect(routeHelper.get.mock.calls.length).toBe(1)
  expect(routeHelper.get.mock.calls[0][0]).toBe('api/users')
})

test('RepositoryHelper should be able to not add parent id condition if we do not have.', () => {
  const routeHelper = {}
  const query = {}
  query.where = jest.fn(() => {})

  const helper = new RepositoryHelper(routeHelper)
  helper.addParentIdCondition(query, {}, null)
  
  expect(query.where.mock.calls.length).toBe(0)
})

test('RepositoryHelper should be able to add parent id condition if we have.', () => {
  const routeHelper = {}
  const query = {}
  query.where = jest.fn(() => {})

  const helper = new RepositoryHelper(routeHelper)
  helper.addParentIdCondition(query, { userId: 1 }, 'userId')
  
  expect(query.where.mock.calls.length).toBe(1)
  expect(query.where.mock.calls[0][0]).toBe('user_id')
  expect(query.where.mock.calls[0][1]).toBe(1)
})
