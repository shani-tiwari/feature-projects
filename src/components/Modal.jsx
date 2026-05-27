/* 

createPortal allows us to render a component 
outside of the component tree (use case: to avoid clipping 
if any ancestor)


/* 
  
  first argument : jsx 
  second argument : node in the dom (where u want to render)
  ex: document.body, document.getElementById("modal")

*/

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);



  function blockOutsideAccess() {
    const body = document.getElementsByTagName("body")[0];

    [...body.children].forEach((el) => {
      if (!el.getAttribute("data-dialog")) {
        el.setAttribute("aria-hidden", true);
        el.setAttribute("inert", true);
      }
    });
  }

  function unBlockOutsideAccess() {
    const body = document.getElementsByTagName("body")[0];

    [...body.children].forEach((el) => {
      if (!el.getAttribute("data-dialog")) {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("inert");
      }
    });
  }

  // Handle scroll lock, returning focus, and blocking outside access
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Give React a tick to render the modal DOM
      setTimeout(() => {
        blockOutsideAccess();
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
      unBlockOutsideAccess();
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      unBlockOutsideAccess();
    };
  }, [isModalOpen]);

  // Handle Escape key and focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        return;
      }

      if (e.key === 'Tab' && isModalOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // If shift+tabbing from first element or the container itself
          if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // If tabbing from last element
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);


  return createPortal(
    <>
      <button 
        ref={buttonRef}
        className='bg-yellow-200 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-400 transition-colors z-100' 
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>
      {
        isModalOpen && (
          <div data-dialog="true" className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
            <div 
              className="bg-white rounded-lg shadow-xl p-6 w-96 relative text-black outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              ref={modalRef}
              tabIndex={-1}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 id="modal-title" className="text-2xl font-bold mb-4">Random Text Modal</h2>
              <p id="modal-desc" className="mb-6 text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-white text-zinc-800 font-semibold rounded-lg shadow hover:bg-zinc-200 transition-colors"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div> 
        )
      }
    </>
    , document.body
  );
};

export default Modal;
