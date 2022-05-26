import Airtable from "airtable";
const { AIRTABLE_APP_KEY, AIRTABLE_BASE } = process.env;

const airtableBase = new Airtable({ apiKey: AIRTABLE_APP_KEY }).base(AIRTABLE_BASE);
export default airtableBase;
