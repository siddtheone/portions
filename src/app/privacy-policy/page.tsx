import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Privacy Policy
      </Typography>

      <Typography variant="body1">
        This app helps users calculate how much cooked food to take from a
        container when dividing it among multiple people.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Information Collection and Use
        </Typography>
        <Typography variant="body1">
          The App does{" "}
          <strong>
            not collect, transmit, or store any personal information
          </strong>{" "}
          on external servers. All data entered or created within the App — such
          as container names (e.g., “Red Pan”, “Small Glass Bowl”) — is stored{" "}
          <strong>only on the user’s own device</strong> using the browser’s{" "}
          <strong>local storage</strong> feature. This data remains private to
          the user and is never shared with the developer or any third parties.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Permissions
        </Typography>
        <Typography variant="body1">
          The App does not require access to your contacts, camera, files, or
          location. It functions entirely on-device and does not need an
          internet connection to perform its core calculations.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Third-Party Services
        </Typography>
        <Typography variant="body1">
          The App does not use any third-party analytics, advertising, or
          tracking services.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Data Deletion
        </Typography>
        <Typography variant="body1">
          If you wish to remove your saved data, you can do so by clearing the
          browser data or app storage on your device. This will delete all
          locally stored containers and preferences.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Changes to This Policy
        </Typography>
        <Typography variant="body1">
          If this Privacy Policy changes, updates will be posted at this same
          link.
        </Typography>
      </Box>
    </Container>
  );
}
