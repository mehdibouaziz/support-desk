import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTicket,
  closeTicket,
} from "../features/tickets/ticketSlice";
import {
  getNotes,
  createNote,
} from "../features/notes/noteSlice";
import { toast } from "react-toastify";
import Modal from 'react-modal'
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { FaPlus, FaTimesCircle } from "react-icons/fa";

// Modal custom styles
const customStyles = {
  content: {
    width: '85vw',
    maxWidth: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
Modal.setAppElement('#root')

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const {
    notes,
    isLoading: notesIsLoading,
  } = useSelector((state) => state.notes);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = params;

  // Close ticket
  const onTicketClose = () => {
    if (window.confirm("Do you really want to close this ticket?")) {
      dispatch(closeTicket(ticketId));
      toast.success("Ticket Closed");
      navigate("/tickets");
    }
  };

  // open/close modal
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  // Submit new note
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>{"Something went wrong :("}</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-UK")}
        </h3>
        <h3>Product: {ticket.product}</h3>

        <hr />
        <div className="ticket-desc">
          <h4>Model: {ticket.model}</h4>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className="btn"><FaPlus /> Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
        <h2>Add note</h2>
        <button className="btn-close" onClick={closeModal}><FaTimesCircle /></button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" className="form-control" placeholder="Note text" value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </Modal>

      {notes.length === 0 ? (
        <div className="note">0 notes</div>
      ) : (
        notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })
      )}

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
