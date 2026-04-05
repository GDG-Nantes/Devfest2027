import { CommonParams } from "@/types";
import SchedulePage from "../page";

export default async function ScheduleFirstDayPage({ params }: CommonParams) {
  return (<SchedulePage params={params} day={1} />);
}