import { CommonParams } from "@/types";
import SchedulePage from "../page";

export default async function ScheduleSecondDayPage({ params }: CommonParams) {
  return (<SchedulePage params={params} day={2} />);
}