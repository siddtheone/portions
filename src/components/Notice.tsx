import { useSettings } from "@/store/useSettings";
import { Alert, Typography, Dialog } from "@mui/material";

export function Notice() {
  const { noticeShowed } = useSettings((state) => state.settings);
  const updateSettings = useSettings((state) => state.updateSettings);
  return noticeShowed === false ? (
    <Dialog open={noticeShowed === false}>
      <Alert
        severity="info"
        onClose={() => updateSettings({ noticeShowed: true })}
        sx={{
          position: "fixed",
          top: "20%",
          left: 16,
          right: 16,
          zIndex: 1000,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Typography variant="body2">
          This application tracks anonymous usage data for analytics purposes.
          By using this application, you consent to this data collection.
        </Typography>
      </Alert>
    </Dialog>
  ) : null;
}
