import { Redirect } from 'expo-router';

// Keep old /activity links working while routing users to the real trackers.
export default function ActivityRedirect() {
  return <Redirect href="/" />;
}
