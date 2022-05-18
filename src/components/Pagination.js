import '../styling/Table.css'
const Pagination = ({ totalChars, postsPerPage, setCurrent,setPostsPerPage }) => {
    const updatePosts = (e) => {
        const val = document.querySelector('.ddl')
        setPostsPerPage(val.value)
        console.log(e.target.value)
    }
    const pageNumbers = []
    //populate array with pagination numbers
    for (let x = 1; x <= Math.ceil(totalChars / postsPerPage); x++) {
        pageNumbers.push(x);
    }
    //function to navigate through list of characters
    const paginate = (number) =>{
        setCurrent(number)
    }
    const pageLinks = pageNumbers.map(nums => {

        return (
            <li className='page' onClick={()=>{paginate(nums)}}>
                {nums}
            </li>
        )

    })
    return (<>
        <nav className="link-nav">
            <ul className="link-list">
                {pageLinks}
            </ul>
            
            <select className='ddl' onChange={()=>{updatePosts()}}>
                <option value="10">10</option>
                <option value="20">25</option>
                <option value='25'>50</option>
                <option value='100'>100</option>
            </select>
        </nav>
    </>)
}

export default Pagination