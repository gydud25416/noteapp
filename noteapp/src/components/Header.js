import './Header.css'
export default function Header({title, leftChild, rightChild}){

    return(
        <header id="header">
            
            <div className='leftChild'>{leftChild}</div>
            <h1>{title}</h1>
            <div className='rightChild'>{rightChild}</div>
        </header>
    )
}