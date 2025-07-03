import React, {useState, useEffect, useCallback} from "react";
import {useRouter} from "next/router";
import {useAlert} from "@/context/Alert";
import api from "@/utils/axios";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Missing from "@/components/Missing";
import {IoCodeSharp} from "react-icons/io5";
import {FaPlay, FaRegEye} from "react-icons/fa";
import {HiOutlineDownload} from "react-icons/hi";
import {CodeData} from "@/types/code";

interface GeneratedFile {
    fileName: string;
    content: string;
}

interface ProgramResultProps {
    id?: string;
    embedded?: boolean;
}

const ProgramResult: React.FC<ProgramResultProps> = ({id, embedded = false}) => {
    const router = useRouter();
    const alert = useAlert();

    const queryId = router.query.id;
    const finalId = id || (typeof queryId === "string" ? queryId : null);

    const [files, setFiles] = useState<GeneratedFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewSrcDoc, setReviewSrcDoc] = useState<string>("");

    const fetchProgramFiles = useCallback(async () => {
        if (!finalId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const res = await api.get(`/code/result/${finalId}`);
            const response: CodeData = res.data.data;
            const result = response.result;

            const parsed: GeneratedFile[] = [];
            (["html", "css", "js"] as const).forEach((group) => {
                if (result[group]) {
                    Object.entries(result[group]).forEach(([name, content]) => {
                        parsed.push({fileName: name, content});
                    });
                }
            });
            setFiles(parsed);
        } catch {
            alert("Opps", "Failed to fetch program files", "error");
        } finally {
            setLoading(false);
        }
    }, [finalId, alert]);

    useEffect(() => {
        fetchProgramFiles().then();
    }, [fetchProgramFiles]);

    const handleDownload = (file: GeneratedFile) => {
        const blob = new Blob([file.content], {
            type: file.fileName.endsWith('.js')
                ? 'application/javascript'
                : file.fileName.endsWith('.css')
                    ? 'text/css'
                    : 'text/html',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadAll = async () => {
        if (!files.length) return;
        const zip = new (await import('jszip')).default();
        files.forEach(f => zip.file(f.fileName, f.content));
        const blob = await zip.generateAsync({type: 'blob'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code-${finalId}.zip`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePreview = (file: GeneratedFile) => {
        setPreviewFile(file);
    };

    const handleReview = () => {
        const htmlFiles = files.filter(f => f.fileName.endsWith('.html'));
        if (!htmlFiles.length) {
            alert('No HTML file to preview.', '', 'error');
            return;
        }
        const cssTags = files
            .filter(f => f.fileName.endsWith('.css'))
            .map(c => `<style>\n${c.content}\n</style>`)
            .join('\n');
        const jsTags = files
            .filter(f => f.fileName.endsWith('.js'))
            .map(j => `<script>\n${j.content}\n</script>`)
            .join('\n');

        let mainHtml = htmlFiles.find(f => f.fileName === 'index.html')?.content || htmlFiles[0].content;
        mainHtml = mainHtml.replace('</head>', `${cssTags}\n</head>`);
        mainHtml = mainHtml.replace('</body>', `${jsTags}\n</body>`);

        setReviewSrcDoc(mainHtml);
        setIsReviewOpen(true);
    };

    if (loading) {
        return embedded ? <Loader/> : (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!finalId) return embedded ? null : <Missing/>;

    if (!files) return embedded ? <Loader/> : null;

    return (
        <div className="w-full flex flex-col">
            <h3 className="md:text-xl font-semibold mb-4">Generated Files</h3>
            {files.length === 0 ? (
                <p className="text-secondary-600">No files available.</p>
            ) : (
                <>
                    <div className="space-y-3 overflow-auto">
                        {files.map(file => (
                            <div key={file.fileName}
                                 className="bg-primary-700 px-4 py-2 rounded-lg flex items-center justify-between">
                                <span className="text-white">{file.fileName}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handlePreview(file)}
                                            className="bg-accent-400 px-2 rounded-md">
                                        <IoCodeSharp className="text-black text-xl"/>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (file.fileName.endsWith(".html")) {
                                                const url = URL.createObjectURL(
                                                    new Blob([file.content], {type: "text/html"})
                                                );
                                                window.open(url, "_blank");
                                            } else {
                                                handlePreview(file);
                                            }
                                        }}
                                        className="bg-primary-600 p-2 rounded-md"
                                    >
                                        <FaRegEye className="text-white text-xl"/>
                                    </button>
                                    <button onClick={() => handleDownload(file)}
                                            className="bg-primary-600 p-2 rounded-md">
                                        <HiOutlineDownload className="text-white text-xl"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button onClick={handleReview}
                                className="flex items-center gap-2 bg-primary-600 px-3 py-2 rounded text-lg font-semibold">
                            <FaPlay/>
                            <span>Review App</span>
                        </button>
                        <button onClick={handleDownloadAll}
                                className="flex items-center gap-2 bg-accent-400 px-3 py-2 rounded text-lg text-black font-semibold">
                            <HiOutlineDownload/>
                            <span>Download ZIP</span>
                        </button>
                    </div>
                </>
            )}

            {previewFile && (
                <Modal title={previewFile.fileName} onClose={() => setPreviewFile(null)}>
                    <div className="bg-background-dark rounded p-4 overflow-auto max-h-96">
                        <pre className="whitespace-pre-wrap text-sm text-white">{previewFile.content}</pre>
                    </div>
                </Modal>
            )}

            {isReviewOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsReviewOpen(false)}/>
                    <div className="relative w-full h-[80vh] bg-background-dark rounded overflow-hidden">
                        <div className="flex justify-end bg-background-light p-2 space-x-2">
                            <button
                                onClick={() => window.open(URL.createObjectURL(new Blob([reviewSrcDoc], {type: 'text/html'})), '_blank')}
                                className="px-3 py-1 bg-primary-600 rounded text-white hover:bg-primary-500">
                                Open in New Tab
                            </button>
                            <button onClick={() => setIsReviewOpen(false)}
                                    className="px-3 py-1 bg-red-600 rounded text-white">
                                Close
                            </button>
                        </div>
                        <iframe title="App Preview" srcDoc={reviewSrcDoc} className="w-full h-full"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgramResult;