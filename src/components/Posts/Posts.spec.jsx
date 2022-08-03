/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react"
import { Posts } from '.'

const props = {
    posts:[
        {
            id: 1,
            title: 't1',
            body: 'b1',
            cover: 'img/c1.png',
        },
        {
            id: 2,
            title: 't2',
            body: 'b2',
            cover: 'img/c2.png',
        },
        {
            id: 3,
            title: 't3',
            body: 'b3',
            cover: 'img/c3.png',
        }
]
    
}

describe('<Posts />', ()=>{
    it('should render posts',()=>{
        render(<Posts {...props}/>)

        expect(screen.getAllByRole('heading', { name: /t/i })).toHaveLength(3)
        expect(screen.getAllByRole('img', { name: /t/i })).toHaveLength(3)
        expect(screen.getAllByText( /b/i )).toHaveLength(3)
        
    })

    it('should not render posts', () => {
        render(<Posts/>)
        expect(screen.queryByRole('heading', { name: /t/i })).not.toBeInTheDocument()
    })

    it('should match snapshot',()=>{
        const { container } = render(<Posts {...props} />)
        expect(container.firstChild).toMatchSnapshot()
    })

})