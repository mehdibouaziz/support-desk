import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <section className="heading">
        {user && <p>Hello, {user.name}!</p>}
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to='/new-ticket' className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to='/tickets' className="btn btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default Home