/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { get } from 'lodash';
import { comparePassword } from '../utils/hashPassword.util';

export const app = firebase.initializeApp({
   projectId: import.meta.env.VITE_PROJECT_ID,
   appId: import.meta.env.VITE_APP_ID,
   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
   locationId: import.meta.env.VITE_LOCATION_ID,
   apiKey: import.meta.env.VITE_API_KEY,
   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});

export const storage = getStorage(app);
export const db = getFirestore(app);

/**
 * udploadFile Subir archivo a la BBDD Firebase
 * @param {File} file El archivo que vamos a subir
 * @returns {string} url de la archivo guardado en la BBDD
 */
export async function uploadFile(file, idBook, isFrontPage) {
   const storageRef = ref(storage);
   const bookFolderRef = ref(storageRef, `books/${idBook}`);
   const fileName = isFrontPage ? `frontPage-${idBook}` : `backCover-${idBook}`;
   const fileRef = ref(bookFolderRef, `${fileName}`);
   await uploadBytes(fileRef, file);
   const url = await getDownloadURL(fileRef);
   return url;
}

export async function addBookRequest(book) {
   // Agrega un nuevo documento a la colección 'books' con los datos proporcionados
   try {
      const docRef = await addDoc(collection(db, 'books'), book);
      console.log('Nuevo libro agregado con ID desde FB: ', docRef.id);
      return docRef.id; // Devuelve el ID del documento creado
   } catch (error) {
      console.error('Error al agregar el libro: ', error);
      throw error; // Lanza el error para que pueda ser manejado en el código que llama a esta función
   }
}

//Actualizar libro
export async function updateBookRequest(bookId, updatedBook) {
   try {
      // Referencia al documento del libro que se va a actualizar
      const bookRef = doc(db, 'books', bookId);
      // Actualiza el documento con los datos proporcionados en updatedBook
      await updateDoc(bookRef, updatedBook);
   } catch (error) {
      console.error('Error al actualizar el libro: ', error);
      throw error;
   }
}

//Obtener una collection
export async function getCollection(nameCollection) {
   const ref = collection(db, nameCollection);
   const querySnapshot = await getDocs(ref);

   const data = querySnapshot.docs.map((doc) => ({
      id: doc.id, // El ID del documento
      ...doc.data(), // Los datos del participante
   }));
   return data;
}

//Obtener un libro según id
export async function getBookById(bookId) {
   try {
      // Referencia al documento del libro
      const bookRef = await doc(db, 'books', bookId);
      const book = getDoc(bookRef);

      // Verificar si el libro existe
      if (!(await book).exists()) {
         throw new Error('El libro no fue encontrado.');
      }

      // Obtener los datos del libro
      const bookData = (await book).data();
      return bookData;
   } catch (error) {
      console.error('Error al obtener el libro:', error);
      throw error;
   }
}

// Function to authenticate user login
export async function authenticateUser(username: string, password: string) {
   try {
      // Get user document from Firestore
      const userDoc = await getCollection('users');
      const userData = userDoc.filter((user) => get(user, 'user', false) === username);
      if (userData?.length) {
         const hashedPassword = get(userData[0], 'password', 'password');
         // Compare provided password with hashed password from database
         const isPasswordCorrect = await comparePassword(password, hashedPassword);
         if (!isPasswordCorrect) {
            return false; // Incorrect password
         }
         return get(userData[0], 'user', 'test');
      } else return false; // User not found
   } catch (error) {
      return false; // Error occurred during authentication
   }
}
