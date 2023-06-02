import Typography from "@mui/material/Typography";

export default function BillingGroup({ billingGroup }) {
  return [
    <Typography key="0" sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
      Billing Group
    </Typography>,
    <Typography key="1" color="text.primary">
      {billingGroup}
    </Typography>
  ];
}
