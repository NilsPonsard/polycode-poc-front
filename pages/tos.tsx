import { Typography } from '@mui/material';
import styles from '../styles/Tos.module.css';

export default function Tos() {
  return (
    <div className="centered">
      <div className={styles.text}>
        <Typography variant="h2">PolyCode Terms of Service</Typography>
        <br />
        <Typography variant="body1">
          Please read these terms of service carefully before using PolyCode
          website operated by Polytech DO.
        </Typography>
        <Typography variant="h5">Conditions of use</Typography>
        <Typography variant="body1">
          By using this website, you certify that you have read and reviewed
          this Agreement and that you agree to comply with its terms. If you do
          not want to be bound by the terms of this Agreement, you are advised
          to leave the website accordingly. Polycode only grants use and access
          of this website, its products, and its services to those who have
          accepted its terms.
        </Typography>

        <Typography variant="h5">Privacy policy</Typography>
        <Typography variant="body1">
          Polycode does not collect any usage information about you, the code
          executed is deleted seconds after the output has been sent back. We
          don’t keep any history. <br />
          Concerning the email, we will only use this information to send you
          important emails : an activation email, a password reset email (if you
          ask for it) and emergency email in case of a data breach. <br />
          To get your account removed from our database, please contact us at
          nilsponsard@gmail.com
        </Typography>
        <Typography variant="h5">Age restriction</Typography>
        <Typography variant="body1">
          You must be at least 13 (thirteen) years of age before you can use
          this website. By using this website, you warrant that you are at least
          13 years of age and you may legally adhere to this Agreement. Polycode
          assumes no responsibility for liabilities related to age
          misrepresentation.
        </Typography>
        <Typography variant="h5">Intellectual property</Typography>
        <Typography variant="body1">
          You agree that all materials, products, and services provided on this
          website are the property of PolyCode DO, its affiliates, directors,
          officers, employees, agents, suppliers, or licensors including all
          copyrights, trade secrets, trademarks, patents, and other intellectual
          property. You also agree that you will not reproduce or redistribute
          the PolyCode’s intellectual property in any way, including electronic,
          digital, or new trademark registrations. For issues regarding
          intellectual property claims, you should contact the company in order
          to come to an agreement. User accounts As a user of this website, you
          may be asked to register with us and provide private information. You
          are responsible for ensuring the accuracy of this information, and you
          are responsible for maintaining the safety and security of your
          identifying information. You are also responsible for all activities
          that occur under your account or password. If you think there are any
          possible issues regarding the security of your account on the website,
          inform us immediately so we may address it accordingly. We reserve all
          rights to terminate accounts, edit or remove content and cancel orders
          in their sole discretion.
        </Typography>
        <Typography variant="h5">Applicable law</Typography>
        <Typography variant="body1">
          By visiting this website, you agree that the laws of France, without
          regard to principles of conflict laws, will govern these terms and
          conditions, or any dispute of any sort that might come between
          PolyCode and you, or its business partners and associates.
        </Typography>

        <Typography variant="h5">Disputes</Typography>
        <Typography variant="body1">
          Any dispute related in any way to your visit to this website or to
          products you purchase from us shall be arbitrated by state or federal
          court and you consent to exclusive jurisdiction and venue of such
          courts.
        </Typography>
        <Typography variant="h5">Indemnification</Typography>
        <Typography variant="body1">
          You agree to indemnify PolyCode and its affiliates and hold PolyCode
          harmless against legal claims and demands that may arise from your use
          or misuse of our services. We reserve the right to select our own
          legal counsel.
        </Typography>

        <Typography variant="h5">Limitation on liability</Typography>

        <Typography variant="body1">
          PolyCode is not liable for any damages that may occur to you as a
          result of your misuse of our website. PolyCode reserves the right to
          edit, modify, and change this Agreement any time. We shall let our
          users know of these changes through electronic mail. This Agreement is
          an understanding between PolyCode and the user, and this supersedes
          and replaces all prior agreements regarding the use of this website.
        </Typography>
      </div>
    </div>
  );
}
