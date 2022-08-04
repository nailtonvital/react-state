import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx)=>{
    return res(
      ctx.json(
      [
        {
          "userId": 1,
          "id": 1,
          "title": "title1",
          "body": "body"
        },
        {
          "userId": 2,
          "id": 2,
          "title": "title2",
          "body": "body"
        },
        {
          "userId": 3,
          "id": 3,
          "title": "title3",
          "body": "body"
        },
      ],
    ))
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            url: 'img/img1.png'
          },
          {
            url: 'img/img2.png'
          },
          {
            url: 'img/img3.png'
          },
        ],
      ))
  })
]

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(()=>{
    server.listen()
  })

  afterEach(()=>{
    server.resetHandlers()
  })

  afterAll(()=>{
    server.close()
  })


  it('should render search, posts and load more', async ()=>{
    render(<Home />)
    const noMorePosts = screen.getByText('Not Found')

    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/Search something/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img', { name: /title/i })
    expect(images).toHaveLength(3)

    const button = screen.getByRole('button', { name: /Load More/i })
    expect(button).toBeInTheDocument()
    
  })

  it('should search for posts ', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Not Found')

    // expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/Search something/i)
     
    expect(screen.getByRole('heading',{ name: 'title1' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument()

    expect(screen.queryByRole('heading', { name: 'title4' })).not.toBeInTheDocument()

    // 

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Term: title1' })).toBeInTheDocument();
    
    userEvent.clear(search)
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument()

    userEvent.type(search, 'grfg')
    expect(screen.getByText('Not Found')).toBeInTheDocument()
  })
})
