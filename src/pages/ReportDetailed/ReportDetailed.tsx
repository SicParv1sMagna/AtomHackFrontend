import { useNavigate, useParams } from "react-router-dom";
import TurndownService from "turndown";
import TextEditor from "../../feature/TextEditor";
import { useCallback, useEffect, useState } from "react";
import { Button, Text } from "@mantine/core";
import { IconChevronLeft, IconDownload } from "@tabler/icons-react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import s from "./ReportDetailed.module.scss";
import { saveMarkdownFile } from "../../utils/files";
import { getDetailed } from "../../entities/Report/api";
import { ReportModel } from "../../entities/Report/types";
import File from "../../entities/File";
import { getNameAndType } from "./utils";

export const ReportDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState<ReportModel | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editable: false,
  });

  useEffect(() => {
    if (!id || !editor) {
      return;
    }

    getDetailed({ id: Number(id) }).then((res) => {
      setReport(res.data);
      editor.commands.setContent(JSON.parse(res.data.payload));
    });
  }, [id, editor]);

  const handleSave = useCallback(() => {
    if (!report || !editor) {
      return;
    }

    const htmlContent = editor.getHTML();

    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(htmlContent);

    saveMarkdownFile(
      `${report.owner}_${new Date(report.sentTime).getTime()}`,
      markdownContent
    );
  }, [editor, report]);

  if (!id || !report) {
    // @todo: замена на NotFoundPage
    return null;
  }

  return (
    <TextEditor
      editor={editor}
      customToolbar={
        <>
          <div className={s.root__toolbar}>
            <IconChevronLeft
              size={20}
              stroke={1.5}
              onClick={() => navigate(-1)}
              cursor="pointer"
            />

            <Text
              tt="uppercase"
              fw={700}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              {report.owner}
            </Text>

            <Button
              leftSection={<IconDownload size={20} />}
              variant="outline"
              color="blue"
              onClick={handleSave}
            >
              Сохранить
            </Button>

            <div style={{ textAlign: "end" }}>
              <Text size="sm" fw={500}>
                Отправлено: {report.sentTime.toLocaleString()}
              </Text>

              {report.receivedTime ? (
                <Text size="sm">
                  Доставлено: {report.receivedTime.toLocaleString()}
                </Text>
              ) : (
                <Text c="dimmed" size="sm">
                  Не доставлено
                </Text>
              )}
            </div>
          </div>
          {
            // @todo: изменить тип данных для file в Props
            report.files.map((file) => {
              const { type, fileName } = getNameAndType(file.path);
              return (
                <File
                  key={file.id}
                  index={file.id}
                  name={fileName || ""}
                  isDraft={false}
                  type={type || ""}
                  DeleteFile={() => {}}
                />
              );
            })
          }
        </>
      }
    />
  );
};
