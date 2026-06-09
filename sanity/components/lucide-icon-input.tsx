"use client";

import { Card, Flex, Stack, Text, TextInput } from "@sanity/ui";
import { type StringInputProps } from "sanity";

import { isLucideIconName, LucideIcon } from "@/components/lucide-icon";

function previewMessage(icon?: string) {
    if (!icon) return "No icon added — Ban will be shown";
    if (isLucideIconName(icon)) return icon;
    return `"${icon}" not available — Ban will be shown`;
}

export function LucideIconInput(props: StringInputProps) {
    const { elementProps, validationError, value } = props;
    const icon = value || undefined;
    const resolved = isLucideIconName(icon);

    return (
        <Stack space={3}>
            <TextInput
                {...elementProps}
                value={value || ""}
                customValidity={validationError}
                fontSize={1}
                padding={2}
                radius={2}
            />

            <Card
                tone={resolved ? "default" : "caution"}
                border
                padding={3}
                radius={2}
            >
                <Flex align="center" gap={3}>
                    <LucideIcon name={icon} size={24} />
                    <Text size={1}>{previewMessage(icon)}</Text>
                </Flex>
            </Card>

            <Text
                size={1}
                as="a"
                href="https://lucide.dev/icons"
                target="_blank"
                rel="noopener noreferrer"
                accent
            >
                Browse icons on lucide.dev
            </Text>
        </Stack>
    );
}
