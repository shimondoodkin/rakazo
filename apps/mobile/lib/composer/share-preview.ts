import { isAttachmentImageMimeType } from "@rakazo/contracts";
import type { IncomingShare } from "./incoming-share";

/** Preview source URIs directly: choosing a target must not copy or read entire files. */
export function sharePreview(share: IncomingShare) {
  const isImage = (file: IncomingShare["files"][number]) =>
    !!file.mimeType && isAttachmentImageMimeType(file.mimeType);
  const images = share.files.filter(isImage);
  const files = share.files.filter((file) => !isImage(file));
  return {
    text: share.text,
    images: images.slice(0, 4),
    extraImages: Math.max(0, images.length - 4),
    fileCount: files.length,
    fileName: files.length === 1 ? (files[0]?.name ?? null) : null,
  };
}
