import * as admin from 'firebase-admin';

if (admin.apps.length == 0 && process.env.GCP_CREDENTIAL) {
  const credential = JSON.parse(
    Buffer.from(
      process.env.GCP_CREDENTIAL.replace(/\\n/g, '\n'),
      'base64'
    ).toString()
  );

  admin.initializeApp({
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    credential: admin.credential.cert(credential),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}
