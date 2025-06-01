import { registerModelHandler } from "@modelcontextprotocol/server-core";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

registerModelHandler("github.commit", async ({ input }) => {
  const commit = input.commit || {};
  const message = commit.message || "No commit message";
  const timestamp = new Date(commit.timestamp || Date.now());
  const repo = input.repository?.full_name || "unknown/repo";

  const yyyyMMdd = timestamp.toISOString().slice(0, 10).replace(/-/g, "");
  const title = `[${yyyyMMdd}] ${message}`;

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: title }
            }
          ]
        },
        Message: {
          rich_text: [
            {
              text: { content: message }
            }
          ]
        },
        Date: {
          date: {
            start: timestamp.toISOString()
          }
        },
        Repo: {
          rich_text: [
            {
              text: { content: repo }
            }
          ]
        }
      }
    });
    console.log("✅ Notion 페이지 생성 완료:", title);
  } catch (err) {
    console.error("❌ Notion 저장 실패:", err.message);
  }
});