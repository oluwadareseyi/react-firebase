/**
 * @function collectAll
 * @param  {Object} doc - Takes in the document or snapshot gotten returned by firebase, and adds in the id of the document.
 * @returns {Object} - The document, and the document ID.
 */
export const collectAll = (doc) => {
  return { ...doc.data(), id: doc.id };
};
