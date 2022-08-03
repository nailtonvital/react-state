import { render, screen } from "@testing-library/react"
import { PostCard } from "."

const props = {
    title: 'title',
    body: 'body 1',
    id: 1,
    cover: 'img/img.png'
}

describe('<PostCard />', ()=>{
    it('shoud render PostCard correctly', ()=>{
        render(<PostCard {...props}/>)

        expect(screen.getByAltText(/title/))
        .toHaveAttribute('src','img/img.png')
        expect(screen.getByRole('heading', { name: /title/i})).toBeInTheDocument()
        expect(screen.getByText('body 1')).toBeInTheDocument()
    })

    it('shoud match snapshot', () => {
        const { container } = render(<PostCard {...props} />)
        expect(container.firstChild).toMatchSnapshot()
    })
})