import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export function YouTubeAlert(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"How Do I Find My YouTube Video ID?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          After clicking on a YouTube Video, the url will look like this:
          <DialogContentText>
            https://www.youtube.com/watch?v=9DIqnFqYeTE
          </DialogContentText>
          In this example the id is 9DIqnFqYeTE.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          target="_blank"
          href="https://www.easterseals.com/assets/includes/youtube-id.html#:~:text=The%20video%20ID%20will%20be,is%20aqz%2DKE%2DbpKQ%20."
        >
          I need more help!
        </Button>
        <Button onClick={props.handleClose} autoFocus>
          Okay Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function FundrasingGoalAlert(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Why is this in USD?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          We will set your goal amount in ETH on the blockchain and in our
          database. Keep in mind that the USD amount could change based on the
          market and value of ETH in USD!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          target="_blank"
          href="https://www.coinbase.com/converter/eth/usd"
        >
          Take me to a conversion app!
        </Button>
        <Button onClick={props.handleClose} autoFocus>
          Okay Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function WalletAlert(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"What Is My Project Address?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your project address is the public address of the wallet you'd like
          your funds to go to after your campaign is complete. Please be aware
          you cannot change this address after the creation of your project!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          target="_blank"
          href="https://metamask.zendesk.com/hc/en-us/articles/360015289512-How-to-copy-your-MetaMask-account-public-address-"
        >
          I need more help!
        </Button>
        <Button onClick={props.handleClose} autoFocus>
          Okay Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function ImageAlert(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"What Is An Image URL?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You must use an image that is on the internet. When you find an image
          you like online, you can right click on it to 'Copy Image Address'.
          Paste that here! Please be mindful of copyright laws :)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          target="_blank"
          href="https://support.google.com/websearch/answer/118238?hl=en&co=GENIE.Platform%3DDesktop"
        >
          I need more help!
        </Button>
        <Button onClick={props.handleClose} autoFocus>
          Okay Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function ErrorTransactionAlert(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"There Was An Error!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          It's possible the scientist didn't set up the project correctly or
          your MetaMask is not properly configured!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          Try Again!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function SayThankYou(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Thank you for your donation!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your donation of ${props.donation} will be such a big help!!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          You're Welcome!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function AddProjectError(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"There was an error!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Check your form for any validation errors and/or use the information
          icons on the right for help.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          Okay, got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function NoMetaMaskError(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"MetaMask Is Not Detected!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Download MetaMask or login in order to make contributions or create a project.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button target="_blank" href="https://metamask.io/download/">
          Download MetaMask!
        </Button>
        <Button onClick={props.handleClose} autoFocus>
          Just browsing!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function AddProjectConfirmation(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Awesome!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          It may take a second to add your project to the blockchain!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export function AddDonationConfirmation(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Awesome!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          It may take a second to add your donation to the blockchain!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

//for release funds and refund buttons
export function FundsTransferWait(props) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Just a moment!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          It may take a second to transfer your funds from blockchain to your wallet!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export function PleaseCheckYourAccount(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"There Was An Error!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The MetaMask account you are currently logged into does not match the address we have on file. Please check to make sure you are on the correct account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          Try Again!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
